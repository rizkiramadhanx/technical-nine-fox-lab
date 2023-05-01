import { TLoginForm } from '@/types/form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link as NavLink } from 'react-router-dom';
import * as yup from 'yup';

const schema: yup.ObjectSchema<TLoginForm> = yup.object().shape({
  email: yup.string().email('harus berupa email').required('email harus diisi'),
  password: yup
    .string()
    .required('password harus diisi')
    .min(8, 'minimal 8 karakter')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'Harus berupa kombinasi alfabet dan angka'
    ),
});

export default function Login() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<TLoginForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: TLoginForm) => console.log(data);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          minW={{
            md: '400px',
          }}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                id="email"
                isInvalid={errors.email?.message ? true : false}
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password?.message ? true : false}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack align={'start'} justify={'space-between'}>
                  <Link as={NavLink} to="/register" color={'blue.400'}>
                    Register ?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  disabled={!isValid}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
