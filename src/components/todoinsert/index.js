import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import axios from "axios";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const onClick = e => {
    if (value === "") {
      alert("할일 입력해");
      return 0;
    }
    axios({
      url: "http://127.0.0.1:8080",
      method: "POST",
      data: {
        todo: value
      }
    });
    onInsert(value);
    setValue("");
    e.preventDefault();
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <TodoInsertStyled>
      <TodoInput
        type="text"
        placeholder="할 일 적어"
        value={value}
        onChange={onChange}
      ></TodoInput>
      <TodoInserttButton
        type="submit"
        onClick={onClick}
        onKeyPress={onKeyPress}
      >
        <MdAdd />
      </TodoInserttButton>
    </TodoInsertStyled>
  );
};

const TodoInsertStyled = styled.form`
  display: flex;
  background: #495057;
`;

const TodoInput = styled.input`
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  &::placeholder {
    color: #dee2e6;
  }
  flex: 1;
`;

const TodoInserttButton = styled.button`
  background: none;
  outline: none;
  border: none;
  background: #868e96;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background ease-in;
  &:hover {
    background: #adb5bd;
  }
`;
export default TodoInsert;
