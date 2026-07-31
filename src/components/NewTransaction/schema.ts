import * as yup from "yup";

export const transactionSchema = yup.object().shape({
    description: yup.string().required("Uma descrição é obrigatória"),
    value: yup.number().min(0.01, "O valor deve ser maior que zero").required("O valor é obrigatório"),
    typeId: yup.number().min(1, "O tipo deve ser selecionado").required("O tipo é obrigatório"),
    categoryId: yup.number().min(1, "A categoria deve ser selecionada").required("A categoria é obrigatória"),
});