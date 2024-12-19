import type { Meta,StoryObj } from '@storybook/react';
import { within, userEvent, expect, screen, waitFor } from '@storybook/test';

import LoginForm from '../components/LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'Login Component',
    component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;
 
// export const Primary: Story = {
// };

export const RememberMeChecked: Story = {
    parameters: {  
        test: {  
          dangerouslyIgnoreUnhandledErrors: true,  
        },  
      }
};
RememberMeChecked.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    // Simulate typing into the username field
    await userEvent.type(canvas.getByLabelText("Username"), "testuser");
  
    // Simulate typing into the password field
    await userEvent.type(canvas.getByLabelText("Password"), "password123");
  
    // Simulate checking the 'Remember me' checkbox
    await userEvent.click(canvas.getByLabelText("Remember me"));
  
    // Simulate clicking the submit button
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));
  
    // Verify the form was submitted (action will appear in the Actions panel in Storybook)
    var message = await canvas.findByText("Form Submitted. User has clicked Remember me.");

    expect(message).toBeInTheDocument();

  };


export const DontRememberMeChecked: Story = {parameters: {  
    test: {  
      dangerouslyIgnoreUnhandledErrors: true,  
    },  
  },  };
DontRememberMeChecked.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    // Simulate typing into the username field
    await userEvent.type(canvas.getByLabelText("Username"), "testuser");
  
    // Simulate typing into the password field
    await userEvent.type(canvas.getByLabelText("Password"), "password123");
  
    // Simulate clicking the submit button
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));
  
    // Verify the form was submitted (action will appear in the Actions panel in Storybook)
    //var message = await canvas.findByText("Form Submitted without Remember me.");

    await waitFor(() => {
        const message = canvas.getByText("Form Submitted without Remember me.");
        expect(message).toBeInTheDocument();
      });
    //expect(message).toBeDisabled();

  };

  export const MissingPassword: Story = {};
  MissingPassword.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    // Simulate typing into the username field
    await userEvent.type(canvas.getByLabelText("Username"), "testuser");
  
    // Simulate clicking the submit button
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));
  
    // Verify the form was submitted (action will appear in the Actions panel in Storybook)
    expect(await screen.findByText("Password is required")).toBeTruthy();
  };

  export const MissingUserName: Story = {};
  MissingUserName.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  
    // Simulate typing into the password field
    await userEvent.type(canvas.getByLabelText("Password"), "password123");
  
    // Simulate clicking the submit button
    await userEvent.click(canvas.getByRole("button", { name: /login/i }));
  
    var message = await canvas.findByText("Username is required");
    expect(message).toBeInTheDocument();
  };