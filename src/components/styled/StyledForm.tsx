import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const StyledLabel = styled.label<{ $required?: boolean }>`
  font-weight: 500;
  color: ${theme.colors.secondary[700]};
  font-size: 0.875rem;
  
  ${({ $required }) =>
    $required &&
    css`
      &::after {
        content: ' *';
        color: ${theme.colors.danger[500]};
      }
    `}
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
  
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.danger[500]};
      
      &:focus {
        border-color: ${theme.colors.danger[500]};
        box-shadow: 0 0 0 3px ${theme.colors.danger[100]};
      }
    `}
  
  &::placeholder {
    color: ${theme.colors.secondary[400]};
  }
`;

export const StyledSelect = styled.select<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  background-color: white;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
  
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.danger[500]};
      
      &:focus {
        border-color: ${theme.colors.danger[500]};
        box-shadow: 0 0 0 3px ${theme.colors.danger[100]};
      }
    `}
`;

export const StyledTextarea = styled.textarea<{ $hasError?: boolean }>`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }
  
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.danger[500]};
      
      &:focus {
        border-color: ${theme.colors.danger[500]};
        box-shadow: 0 0 0 3px ${theme.colors.danger[100]};
      }
    `}
  
  &::placeholder {
    color: ${theme.colors.secondary[400]};
  }
`;

export const StyledErrorMessage = styled.span`
  color: ${theme.colors.danger[600]};
  font-size: 0.875rem;
  margin-top: ${theme.spacing.xs};
`;

export const StyledSuccessMessage = styled.div`
  background-color: ${theme.colors.success[50]};
  border: 1px solid ${theme.colors.success[200]};
  color: ${theme.colors.success[700]};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  
  svg {
    margin-bottom: ${theme.spacing.md};
  }
`;