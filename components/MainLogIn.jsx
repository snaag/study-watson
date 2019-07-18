import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { StyledButton } from '../common/StyledComponents';
import { Link } from '../routes';

const StyledContainer = styled.div`
  height: calc(100vh - 110px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledText = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.5;
`;

const StyledCard = styled.div`
  width: calc(100vw - 2rem);
  height: 200px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin-top: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0077ff;
  font-weight: 900;
`;

const MainLogIn = () => {
  const { studies } = useSelector(state => state.study);
  const filterStudies = studies.filter(study => {
    return study.isWithdraw === false;
  });

  return (
    <div>
      <div>
        {filterStudies.length > 0 ? (
          <>
            {filterStudies.map((study, idx) => {
              return (
                <Link
                  key={idx}
                  route={`/studyDetail/${study &&
                    study.study &&
                    study.study.pk}`}
                  href={`/studyDetail/${study &&
                    study.study &&
                    study.study.pk}`}
                >
                  <a>
                    <StyledCard>
                      <StyledTitle>
                        {study && study.study && study.study.name}
                      </StyledTitle>
                      <div>
                        {study && study.study && study.study.description}
                      </div>
                      <br />
                    </StyledCard>
                  </a>
                </Link>
              );
            })}
          </>
        ) : (
          <StyledContainer>
            <img
              src="/static/icon-inbox.svg"
              alt="indox icon"
              style={{ marginBottom: '1rem' }}
            />
            <StyledText>
              참여중인 스터디가 없습니다.
              <br />
              스터디를 만들고 관리해보세요!
            </StyledText>
          </StyledContainer>
        )}
        <Link route="/addStudy" href="/addStudy">
          <a>
            <StyledButton type="button" value="스터디 만들기" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MainLogIn;
