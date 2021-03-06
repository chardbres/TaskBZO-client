import React from 'react'
import { Formik, Form } from 'formik'
import { InputField, MainButton, Wrapper } from '../components/atoms'
import { Box } from '@chakra-ui/react'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <Wrapper variant='small' >
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values)
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        // worked
                        router.push('/')
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='username' label='Username' />
                        <Box mt={4}>
                            <InputField name='password' placeholder='password' label='Password' type='password' />
                        </Box>
                        <MainButton mt={4} type='submit' colorScheme='blue' isLoading={isSubmitting} label='Login' />
                    </Form>
                )}
            </Formik>
        </Wrapper>

    )
}

export default Login