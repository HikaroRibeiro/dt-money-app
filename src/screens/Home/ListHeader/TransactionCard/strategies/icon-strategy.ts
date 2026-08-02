import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";
import { MaterialIcons } from "@expo/vector-icons";


interface IconsData {
    name: keyof typeof MaterialIcons.glyphMap,
    color: string;
}

// Este é um objeto (Record) com os dados dos icones.
export const ICONS: Record<TransactionCardType, IconsData> = {
    total: {
        name: "attach-money",
        color: colors.white
    },
    [TransactionTypes.REVENUE]: {
        name: "arrow-circle-up",
        color: colors["accent-brand-light"]
    },
    [TransactionTypes.EXPENSE]: {
        name: "arrow-circle-down",
        color: colors["accent-red"]
    }
}