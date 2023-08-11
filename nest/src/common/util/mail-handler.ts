// Todo: AWS SES

import formData from 'form-data';

export const sendEmail = async (
  to: string,
  templateName: string,
  subject: string,
  templateVars: Record<string, any> = [],
) => {
  const form = new formData();
  form.append('to', to);
  form.append('template_name', templateName);
  form.append('subject', subject);

  Object.keys(templateVars).forEach((key) => {
    form.append(`v:${key}`, templateVars[key]);
  });

  // Todo: more here

  return form;
};
