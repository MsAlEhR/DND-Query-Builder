import { Field, Form, Formik } from "formik";
import CmpFormTextField from "../../components/CmpFormTextField";
import CmpFormSelect from "../../components/CmpFormSelect";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

function characteristic(intl, values, s) {
  return (
    <Grid container spacing={16} style={{ width: "60%", margin: "auto" }}>
      <Grid container spacing={16} item xs={12}>
        <Grid container item xs={12} md={6}>
          <Grid item xs={12}>
            <Field
              name="title"
              type="text"
              render={({ field, form }) => (
                <CmpFormTextField
                  label={intl.formatMessage({
                    id: "page.AddRule.RuleName"
                  })}
                  errorMessageFieldName="title"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="weight"
              type="text"
              render={({ field, form }) => (
                <CmpFormTextField
                  label={intl.formatMessage({
                    id: "page.AddRule.weight"
                  })}
                  errorMessageFieldName="weight"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="workMode"
              render={({ field, form }) => (
                <CmpFormSelect
                  label={intl.formatMessage({
                    id: "page.AddRule.workMode"
                  })}
                  className={s.select}
                  value={field.value}
                  onChange={roleId => form.setFieldValue("workMode", roleId)}
                  errorMessageFieldName="workMode"
                >
                  {Object.keys(values.baseInfo.workModes).map(
                    (value, index) => (
                      <MenuItem key={index} value={value}>
                        {values.baseInfo.workModes[value]}
                      </MenuItem>
                    )
                  )}
                </CmpFormSelect>
              )}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6}>
          <Grid item xs={12}>
            <Field
              name="category"
              render={({ field, form }) => (
                <CmpFormSelect
                  label={intl.formatMessage({
                    id: "page.AddRule.classType"
                  })}
                  className={s.select}
                  value={field.value}
                  onChange={roleId => form.setFieldValue("category", roleId)}
                  errorMessageFieldName="category"
                >
                  {values.baseInfo.ruleCategoryModels.map((role, index) => (
                    <MenuItem key={index} value={role.id}>
                      {role.title}
                    </MenuItem>
                  ))}
                </CmpFormSelect>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="entityType"
              render={({ field, form }) => (
                <CmpFormSelect
                  label={intl.formatMessage({
                    id: "page.AddRule.Entity"
                  })}
                  className={s.select}
                  value={field.value}
                  onChange={periodType => {
                    form.setFieldValue("entityType", periodType);
                  }}
                  errorMessageFieldName="entityType"
                >
                  {values.baseInfo.entityTypeModels &&
                    values.baseInfo.entityTypeModels.map((role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.title}
                      </MenuItem>
                    ))}
                </CmpFormSelect>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="active"
              render={({ field, form }) => (
                <CmpFormSelect
                  disabled
                  label={intl.formatMessage({
                    id: "keywords.status"
                  })}
                  className={s.select}
                  value={field.value}
                  onChange={active => form.setFieldValue("active", active)}
                  errorMessageFieldName="active"
                >
                  <MenuItem value>
                    {intl.formatMessage({ id: "keywords.active" })}
                  </MenuItem>
                  <MenuItem value={false}>
                    {intl.formatMessage({ id: "keywords.inactive" })}
                  </MenuItem>
                </CmpFormSelect>
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Field
            name="description"
            type="text"
            render={({ field, form }) => (
              <CmpFormTextField
                label={intl.formatMessage({
                  id: "page.AddRule.description"
                })}
                errorMessageFieldName="description"
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default characteristic;
