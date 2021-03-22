import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NumberFormat from 'react-number-format';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { ListCartItem } from '../../components/AlignItemsList';
import { Layuot } from '../../components/import-export';
import { RootState, plussItmCount, minusItmCount, removeItem } from '../pages_import_export';

import { useStyles } from './style.cart';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  email: yup.string().email('NoEmail').required('Pusto'),
  phone: yup.string().required(),
  name: yup.string().required(),
});
const Cart = () => {
  return (
    <Layuot
      baseCategory={{ category: 'Cart', link: '/cart' }}
      category="Cart"
      src={'/wishlist.jpg'}>
      <Container>
        <HorizontalLabelPositionBelowStepper />
      </Container>
    </Layuot>
  );
};

export default Cart;

function FinailStage({ userData, cart }) {
  return (
    <div>
      {JSON.stringify(userData)}
      {JSON.stringify(cart)}
    </div>
  );
}

function CartStepperItem() {
  const style = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);

  const plusHendl = React.useCallback((id: string) => dispatch(plussItmCount(id)), []);
  const minusHendl = React.useCallback((id: string) => dispatch(minusItmCount(id)), []);
  const removeHendl = React.useCallback((id: string) => dispatch(removeItem(id)), []);
  return (
    <div>
      <Grid container direction="row" justify="center">
        <Grid item xs={6}>
          {cart.map((elem) => (
            <ListCartItem
              key={elem._id}
              elem={elem}
              plusHendl={plusHendl}
              minusHendl={minusHendl}
              removeHendl={removeHendl}
            />
          ))}
        </Grid>
        <div>
          <div>All Price </div>$ {totalCartPrice}
        </div>
      </Grid>
    </div>
  );
}

function StepperForm({
  hendleSubmitClick,
  handleSetStateCallback,
  register,
  handleSubmit,
  errors,
  control,
  formState: { isDirty, isValid },
}) {
  console.log(errors, 'errors', isDirty, 'isDirty', isValid, 'isValid');
  const ref = React.useRef(undefined);
  const style = useStyles();
  React.useEffect(() => {
    hendleSubmitClick(ref);
  }, [ref]);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit((data) => handleSetStateCallback(data))}>
      <Grid container direction="column">
        <Grid item xs={4}>
          <FormControl className={style.inpunFields} error={!!errors.email}>
            <InputLabel htmlFor="component-error">Email</InputLabel>
            <Controller
              className={style.inpunFields}
              as={Input}
              name="email"
              control={control}
              defaultValue=""
            />

            <FormHelperText id="component-error-text">
              {errors.email && errors.email.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={style.inpunFields} error={!!errors.phone}>
            <InputLabel htmlFor="component-error">Phone</InputLabel>
            <Controller
              as={
                <NumberFormat
                  customInput={Input}
                  format="+7 (###) ###-####"
                  allowEmptyFormatting
                  mask="_"
                />
              }
              name="phone"
              type="phone"
              control={control}
              defaultValue=""
            />

            <FormHelperText id="component-error-text">
              {errors.phone && errors.phone.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={style.inpunFields} error={!!errors.name}>
            <InputLabel htmlFor="component-error">Name</InputLabel>
            <Controller
              className={style.inpunFields}
              as={Input}
              name="name"
              control={control}
              defaultValue=""
            />

            <FormHelperText id="component-error-text">
              {errors.name && errors.name.message}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <button style={{ display: 'none' }} ref={ref} type="submit"></button>
    </form>
  );
}

function HorizontalLabelPositionBelowStepper() {
  const style = useStyles();

  const [validate, setvalidate] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { register, handleSubmit, errors, formState, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',

    resolver: yupResolver(schema),
  });
  const { isDirty, isValid } = formState;
  const refer = React.useRef(undefined);
  function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }

  const handleSetStateCallback = React.useCallback((data) => {
    setUserData(data);
  }, []);
  console.log(userData, 'userData');
  const hendleSubmitClick = React.useCallback((ref) => {
    refer.current = ref.current;
  }, []);
  const hendleSubmitClickSimular = () => {
    console.log(refer.current);
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
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            formState={{ isDirty, isValid }}
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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cartCount = cart.reduce((acum, item) => acum + item.count, 0);
  const firstActive = !!cartCount && !!totalCartPrice;
  const disabledButton = () => {
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
    setvalidate(disabledButton());
  }, [activeStep, isValid]);

  return (
    <div className={style.root}>
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
              <Button disabled={!validate} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
