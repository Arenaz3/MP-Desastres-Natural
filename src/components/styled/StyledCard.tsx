import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledCard = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  transition: box-shadow 0.2s ease-in-out;
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`;

export const StyledCardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  h2, h3 {
    margin: 0;
    color: ${theme.colors.secondary[900]};
    font-weight: 600;
  }
  
  h2 {
    font-size: 1.25rem;
  }
  
  h3 {
    font-size: 1.125rem;
  }
`;

export const StyledCardContent = styled.div`
  color: ${theme.colors.secondary[700]};
  line-height: 1.6;
`;

export const StyledCardActions = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;