import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";


const Login = () => {
    const [login] = useLoginMutation()
    const dispatch = useAppDispatch();
    const navige = useNavigate();

    const defaultValues = { userId: 'A-0002', password: 'admin123' }

    const onSubmit = async (data: FieldValues) => {

        const toasId = toast.loading("Logging in",);

        try {
            const userInfo = {
                id: data.userId,
                password: data.password
            }
            const res = await login(userInfo).unwrap(); // unwrap for reduce data path step
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            toast.success("Logged in", { id: toasId, duration: 2000 });
            navige(`/${user.role}/dashboard`)
        } catch (error) {
            toast.error("something went Wrong", { id: toasId, duration: 2000 })
        }

    }

    return (
        <Row justify={"center"} align={"middle"} style={{ height: '100vh' }}>

            <PHForm onSubmit={onSubmit} defaultValues={defaultValues} >
                <PHInput type="text" name="userId" label="Id:"></PHInput>
                <PHInput type="text" name="password" label="Password:" ></PHInput>
                <Button htmlType="submit">Login</Button>
            </PHForm>

        </Row>
    );
};

export default Login;