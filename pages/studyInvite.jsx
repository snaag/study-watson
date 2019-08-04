import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledButton } from '../common/StyledComponents';
import { Link } from '../routes';
import Header from '../containers/Header';

const StyledContainer = styled.div`
  width: calc(100vw - 2rem);
  height: calc(100vh - 110px);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled.textarea`
  // border: 1px solid #ededed;
  // width: 100%;
  // padding: 1rem;
  // font-size: 1rem;
  // margin: 0.5rem 0 1.5rem 0;
`;

const StyledSmallButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 1px solid #0077ff;
  color: #0077ff;
  background-color: #fff;

  :active {
    border: 1px solid #0077ff;
    background-color: #0077ff;
    color: #fff;
  }

  :focus {
    outline: none;
  }
`;

const StyledToast = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: #595959;
  color: #fff;
  position: fixed;
  bottom: 60px;
  font-size: 14px;
  text-align: center;
`;

const StudyInvite = ({ studyId, token }) => {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('링크를 생성해 주세요 !!');

  const getUrl = async () => {
    const result = await Axios.post(
      'https://study-watson.lhy.kr/api/v1/study/invite-token/',
      {
        study: studyId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    );
    const value = `${window.location.host}/join/${result.data.key}`;
    setUrl(value);
  };

  const clickLink = async () => {
    await getUrl();
  };

  const onClickLink = () => {
    document.querySelector('#url').select();
    document.execCommand('copy');
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  };

  return (
    <div>
      <Header />
      <StyledContainer>
        <img
          src="/static/icon-send.svg"
          alt="send icon"
          style={{ marginBottom: '1rem' }}
        />
        <div>링크를 공유해서 스터디원을 초대해보세요!</div>
        <StyledLink
          type="text"
          value={url}
          id="url"
          onClick={() => {
            onClickLink();
          }}
          readOnly
        />
        <StyledSmallButton onClick={clickLink} name="make" type="button">
          링크 생성
        </StyledSmallButton>
        {show && <StyledToast>링크가 복사되었습니다!</StyledToast>}
        <br />
        <Link route="/" href="/">
          <a>
            <StyledButton type="button" value="홈으로 돌아가기" />
          </a>
        </Link>
      </StyledContainer>
    </div>
  );
};
StudyInvite.propTypes = {
  studyId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
StudyInvite.getInitialProps = ({ ctx, token }) => {
  const { studyId } = ctx.query;
  return { studyId, token };
};

export default StudyInvite;