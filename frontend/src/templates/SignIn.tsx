import React, { ReactElement, useState, } from 'react';

import { Button } from '../components';
import {Link} from 'react-router-dom'
import { UserType } from '../types';
import axios from 'axios';
import img from '../assets/images/sign_in.png'
import logo from '../assets/images/logo@3x.png'
import styled from 'styled-components';
import { useUserDispatch } from '../contexts/UserContext';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 1000px;
  height: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
`;

const LeftWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
`;

const FormWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */

  .input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
  
    .title {
      font-size: 30px;
      color: #333333;
      margin-bottom: 20px;
    }

    input {
      padding: 20px;
      border-radius: 10px;
      border: solid 1px #999999;
      font-size: 18px;
      margin-bottom: 15px;
      
      &::placeholder {
        font-size: 18px;
        color: #999999;
      }
    }
  }
`;

const Image = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = styled.div`
  width: 151px;
  height: 111px;

  img {
    width: 100%;
    height: 100%;
  }
`;

function Page() {
  const [id, setId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const dispatch = useUserDispatch();

  const signIn = (): void => {
    if(!id || !password) {
      alert("아이디/비밀번호를 확인해주세요.");
      return;
    }
    
    axios.post('http://192.168.0.12:5000/api/user/login', {
      id,
      password,
    })
    .then(res => {
      const { status, data } = res;
      console.log(JSON.stringify(res));
      console.log(data);

      if(status === 200) {
        window.localStorage.setItem('user', JSON.stringify({
          userType: UserType.USER,
          userId: data.id,
          profileImage: data.profileImage,
          userName: data.name,
          phoneNum: data.phoneNum,
          storeName: data.storeName,
          address: data.address,
          orderIdList: data.orderIdList,
          cartIdList: data.cartIdList,
          reviewIdList: data.reviewIdList,
        }));  
       
        window.location.href = '/main/product'
        return;
      }

      if(status === 401) {
        alert('아이디/비밀번호를 확인해주세요.');
      }
    })
    .catch(error => {
      console.log(error) 
    });
  };

  return (
    <Container>
      <Wrapper>
        <LeftWrapper>
          <Logo>
            <img src={logo} alt="" />
          </Logo>
          <FormWrapper>
            <div className="input-wrapper">
              <div className="title">로그인</div>
              <input type="text" placeholder="아이디를 입력해주세요." onChange={e => setId(e.target.value)} value={id} />
              <input type="password" placeholder="비밀번호를 입력해주세요." onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <Button value="로그인" click={signIn} containerStyle={{ marginBottom: 10, width: '100%' }} />
            <Link to="/auth/signUp" style={{ textDecoration: 'none' }}>
              <Button value="회원가입" isFilled={false} containerStyle={{ width: '100%'}} />
            </Link>
          </FormWrapper>
        </LeftWrapper>
        <Image>
          <img src={img} alt="" />
        </Image>
      </Wrapper>
    </Container>
  );
}

export default Page;