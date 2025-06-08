import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'success' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $loading?: boolean;
}

const getVariantStyles = ($variant: string) => {
  switch ($variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary[600]};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary[200]};
        color: ${theme.colors.secondary[800]};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.secondary[300]};
        }
        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.secondary[100]};
        }
      `;
    case 'success':
      return css`
        background-color: ${theme.colors.success[600]};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.success[700]};
        }
        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.success[100]};
        }
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.danger[600]};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.danger[700]};
        }
        &:focus {
          box-shadow: 0 0 0 3px ${theme.colors.danger[100]};
        }
      `;
    default:
      return css`
        background-color: ${theme.colors.primary[600]};
        color: white;
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
      `;
  }
};

const getSizeStyles = ($size: string) => {
  switch ($size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: 0.875rem;
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.lg} ${theme.spacing.xl};
        font-size: 1.125rem;
      `;
    default:
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: 1rem;
      `;
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  outline: none;
  
  ${({ $variant = 'primary' }) => getVariantStyles($variant)}
  ${({ $size = 'md' }) => getSizeStyles($size)}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  
  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
    `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${theme.spacing.sm};
  }
  
  &:last-child svg {
    margin-right: 0;
    margin-left: ${theme.spacing.sm};
  }
`;