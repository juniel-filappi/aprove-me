import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreatePayableDto } from "@/shared/dto/payable/create-payable.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Logger } from "@nestjs/common";

@Processor('payable')
export class PayableProcessor {
    private successCount = 0;
    private failureCount = 0;
    private readonly logger = new Logger(PayableProcessor.name);

    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService
    ) {
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.log(`Processing job ${job.id}`);
    }

    @Process('processPayableBatch')
    async handleBatch(job: Job<{ payables: CreatePayableDto[] }>) {
        this.logger.log(`Processing job ${job.id}`);
        const {payables} = job.data

        for (const payable of payables) {
            try {
                await this.prismaService.payable.create({
                    data: payable
                })

                this.successCount++;
            } catch (error) {
                this.failureCount++;
            }
        }
    }

    @OnQueueCompleted()
    async onCompleted(job: Job) {
        const emailContent = `
            Lote processado com sucesso:
            - Sucessos: ${this.successCount}
            - Falhas: ${this.failureCount}
          `;

        await this.mailerService.sendMail({
            to: 'cliente@example.com',
            subject: 'Lote Processado',
            text: emailContent,
        });

        this.logger.log(`Lote processado: ${this.successCount} sucesso(s), ${this.failureCount} falha(s).`);

        this.successCount = 0;
        this.failureCount = 0;
    }

    @OnQueueFailed()
    async onFail(job: Job, error: any) {
        this.logger.error(`Erro ao processar job ${job.id}`, error);
    }
}