import { Fade, Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalContainer, PaperContainer } from "./styles";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { GridItem } from "../GridItem/styles";
import Button from '../../components/Button/styles';

const validationSchema = yup.object({
  name: yup.string().required("obrigatorio"),
});

function ViewModal({
  open,
  onConfirm,
  maxWidth,
  className,
  padding,
  shadow,
}) {

  const {
    control,
    errors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
  }, [])

  function newUser(value) {
    localStorage.setItem('userName', JSON.stringify(value.name));
    onConfirm()
  }

  return (
    <ModalContainer
      open={open}
      className={className}
      onConfirm={onConfirm}
      maxwidth={maxWidth}
    >
      <Fade in={open} unmountOnExit>
        <PaperContainer padding={padding} maxwidth={maxWidth}>
          <Grid container style={{ padding: "30px" }}>
            <Grid xs={12} lg={12} md={12} className="wellcome__message">
              Seja bem vindo !
            </Grid>
            <GridItem xs={12} lg={12} md={12}>
              Para iniciarmos insira seu nome abaixo.
            </GridItem>
            <form
              onSubmit={handleSubmit(newUser)}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <Grid xs={12} lg={12} md={12} style={{ margin: '20px 0px', textAlign: 'center' }}>
                <Controller
                  as={
                    <TextField
                      name="name"
                      style={{ margin: '0px 15px' }}
                      helperText={errors?.name?.message}
                      fullWidth
                      id="name"
                    />
                  }
                  name="name"
                  defaultValue=""
                  control={control}
                />
              </Grid>
              <Grid xs={12} lg={12} md={12} style={{ margin: '20px 0px', textAlign: 'center' }}>
                <Button type="submit">
                  Continuar
                </Button>
              </Grid>
            </form>
          </Grid>
        </PaperContainer>
      </Fade>
    </ModalContainer>

  );
}

ViewModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

ViewModal.defaultProps = {
  className: "",
  open: false,
  onConfirm: null,
  maxWidth: "630px",
};

export default ViewModal;
