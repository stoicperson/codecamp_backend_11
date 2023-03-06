import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PassengerInput } from './dto/passenger.input';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  createPayment(
    @Args('impUid') impUid: string,
    @Args('ticketId') ticketId: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args('passengersInput') passengerInput: PassengerInput,
    @Context() context: IContext,
  ): Promise<Payment> {
    return this.paymentsService.create({
      impUid,
      ticketId,
      amount,
      passengerInput,
      user: context.req.user,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payment)
  cancelPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'refundAmount', type: () => Int }) refundAmount: number,
    @Context() context: IContext,
  ): Promise<Payment> {
    const user = context.req.user;
    return this.paymentsService.cancel({ impUid, user, refundAmount });
  }
}
