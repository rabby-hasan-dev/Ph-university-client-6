import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

// type TDefaultValues = { userId: string; password: string; }

type TPropsForm = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;

} & TFormCofing

type TFormCofing = {
    defaultValues?: Record<string, any>;
    resolver?:any;
}



const PHForm = ({ onSubmit, children, defaultValues,resolver }: TPropsForm) => {

    const formConfig: TFormCofing = {};

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    if (resolver) {
        formConfig['resolver'] = resolver;
    }
    const methods = useForm(formConfig)

    const submit:SubmitHandler<FieldValues> =(data)=>{
        onSubmit(data);
        methods.reset();


    }


    return (
        <FormProvider {...methods} >

            <Form layout="vertical" onFinish={methods.handleSubmit(submit)}> {children} </Form>
        </FormProvider>
    );
};

export default PHForm;