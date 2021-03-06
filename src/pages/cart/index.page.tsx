import { Button, Container, Step, StepLabel, Stepper, Typography } from '@material-ui/core';

import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';

import { Layuot } from '../../components/import-export';
import { RootState } from '../pages_import_export';
import { formUserdataI } from '../pages_type';

import { useStyles } from './style.cart';
import FinailStage from './FinailStage';
import CartStepperItem from './CartStepperItem';
import StepperForm from './StepperForm';
import { clearCart } from '../../redux/slicers/cartSlicer';
import Head from 'next/head';

const schema = yup.object().shape({
  email: yup.string().email('NoEmail').required('Pusto'),
  phone: yup
    .string()
    .required('Pusto')
    .matches(/[0-9|(|)|-]{14}/, 'Must be only digits'),
  name: yup.string().required(),
});
const Cart = () => {
  return (
    <Layuot
      baseCategory={{ category: 'Cart', link: '/cart' }}
      category="Cart"
      src={'/wishlist.jpg'}
    >
      <Container>
        <HorizontalLabelPositionBelowStepper />
      </Container>
    </Layuot>
  );
};

export default Cart;

function HorizontalLabelPositionBelowStepper() {
  const buttonFinishref = React.useRef(undefined);
  const style = useStyles();

  const [validate, setvalidate] = React.useState(false);
  const [userData, setUserData] = React.useState<formUserdataI>(null);
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { handleSubmit, errors, control, formState, getValues } = useForm<formUserdataI>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;

  const postRder = async () => {
    const data = {
      person: {
        ...userData,
      },
      order: cart.map((elem) => ({
        title: elem.title,
        price: elem.price,
        count: elem.count,
        totalPrice: elem.totalPrice,
        artikul: elem.artikul,
      })),
    };
    const response = await fetch('http://localhost:3000/api/orders', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    });
    let dats = await response.json();
  };

  const refer = React.useRef(undefined);
  function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }

  const handleSetStateCallback = React.useCallback((data) => {
    setUserData(data);
  }, []);

  const hendleSubmitClick = React.useCallback((ref) => {
    refer.current = ref.current;
  }, []);

  const hendleSubmitClickSimular = () => {
    if (refer.current === undefined) {
      return;
    } else refer.current.click();
  };
  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <CartStepperItem />;
      case 1:
        return (
          <StepperForm
            control={control}
            hendleSubmitClick={hendleSubmitClick}
            handleSetStateCallback={handleSetStateCallback}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        );
      case 2:
        return <FinailStage cart={cart} userData={userData} />;
      default:
        return 'Unknown stepIndex';
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    hendleSubmitClickSimular();
    if (buttonFinishref.current && buttonFinishref.current.children[0].innerText === 'FINISH') {
      postRder();
      dispatch(clearCart());
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const disabledButton = (cartCount, totalCartPrice) => {
    const firstActive = !!cartCount && !!totalCartPrice;

    switch (activeStep) {
      case 0:
        return firstActive;

      case 1:
        return isValid;

      case 2:
        return true;

      default:
        return false;
    }
  };

  React.useEffect(() => {
    const cartCount = cart.reduce((acum, item) => acum + item.count, 0);
    setvalidate(disabledButton(cartCount, totalCartPrice));
  }, [activeStep, isValid, totalCartPrice]);

  return (
    <div className={style.root}>
      <Head>
        <title>Cart</title>.
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography component="div" className={style.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography component="div" className={style.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={style.backButton}>
                Back
              </Button>
              <Button
                ref={buttonFinishref}
                disabled={!validate}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
