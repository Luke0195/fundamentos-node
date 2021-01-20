import Transaction from '../models/Transaction';

interface TransactionDTO{
  title:string;
  value: number;
  type: 'income' | 'outcome'
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const {income, outcome}= this.transactions.reduce((acumulador : Balance, transaction: Transaction) =>{
       switch ( transaction.type){
         case "income":
           acumulador.income += transaction.value
         break;

         case "outcome":
           acumulador.outcome += transaction.value
          break;
        default:
        break;
       }

      return acumulador;
    },{
      income:0,
      outcome: 0,
      total:0
    })
      const total = income - outcome;
    return {income,outcome, total}
  }

  public create({title, type, value}: TransactionDTO): Transaction {
    const transtaction = new Transaction({title, type, value})
    this.transactions.push(transtaction)
    return transtaction;
  }
}

export default TransactionsRepository;
