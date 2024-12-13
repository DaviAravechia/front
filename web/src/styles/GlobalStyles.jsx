import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &.edit {
    background-color: #007bff;
    color: white;
    margin-right: 5px;
  }

  &.delete {
    background-color: #dc3545;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;

export const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-bottom: 10px;
`;
