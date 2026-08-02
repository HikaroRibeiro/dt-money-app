import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";

// Mesma estratégia utilizada para o objeto ICONS.
interface CardData {
    label: string,
    bgColor: string,
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
    [TransactionTypes.REVENUE]: {
        label: "Entrada",
        bgColor: "bg-stone-600"
    },
    [TransactionTypes.EXPENSE]: {
        label: "Saída",
        bgColor: "bg-stone-600"
    },
    total: {
        label: "Total",
        bgColor: "bg-green-600"
    }
}