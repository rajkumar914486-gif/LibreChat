import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonalCompanionPanel from '../PersonalCompanionPanel';

const mockSubmitMessage = jest.fn();

jest.mock('~/hooks', () => ({
  useSubmitMessage: () => ({ submitMessage: mockSubmitMessage }),
}));

describe('PersonalCompanionPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('offers distinct ways to begin without making a mode selection mandatory', () => {
    render(<PersonalCompanionPanel />);

    expect(
      screen.getByRole('heading', { name: 'What do you need right now?' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Help me think/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Teach me/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Challenge me/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Build with me/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Just talk/ })).toBeInTheDocument();
  });

  it('submits a bounded challenge prompt through LibreChat chat submission', () => {
    render(<PersonalCompanionPanel />);

    fireEvent.click(screen.getByRole('button', { name: /Challenge me/ }));

    expect(mockSubmitMessage).toHaveBeenCalledTimes(1);
    expect(mockSubmitMessage).toHaveBeenCalledWith({
      text: expect.stringContaining('one meaningful, realistic challenge'),
    });
  });

  it('allows the user to talk without automatically requesting a task plan', () => {
    render(<PersonalCompanionPanel />);

    fireEvent.click(screen.getByRole('button', { name: /Just talk/ }));

    expect(mockSubmitMessage).toHaveBeenCalledWith({
      text: expect.stringContaining('I want to talk, not automatically receive a plan'),
    });
  });
});
