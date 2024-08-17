import { useState } from 'react';
import './App.css';

function App() {
  let [logo] = useState('ReactBlog');
  // 방법 1
  // let [글제목1, a] = useState('남자 코트 추천');
  // let [글제목2, b] = useState('강남 우동맛집');
  // let [글제목3, c] = useState('파이썬독학');

  // 방법2
  const [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동 맛집', '파이썬독학']);
  const [따봉, 따봉변경] = useState([0, 1, 2]); // 따봉변경은 state변경용 함수이며 이걸 사용해야 html 재 렌더링이 발생함.
  const [날짜, 날짜변경] = useState(['2024년 02월 17일', '2024년 02월 17일', '2024년 02월 17일'])
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(0);
  const [입력값, 입력값변경] = useState('');
  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button onClick={ () => {
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순정렬</button>

      <button onClick={ () => {
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>수정</button>
      
      {/* <div className='list'>
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉+1) }}>👍</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={() =>
          modal === true ? setModal(false) : setModal(true)
        }>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {
        // a는 array안에 있던 데이터.
        // 두번째 파라미터는 반복문 돌 때 마다 0부터 1씩 증가하는 정수.
        글제목.map(function (a, i) {
          return (
            <div className='list' key={i}>
              <h4
                onClick={() => { 
                  setModal(true); setTitle(i)
                }}
              > { 글제목[i] }
              <span
                onClick={ (e) => {
                  e.stopPropagation();  // 모달창 이 나오는것을 방지함.
                  let 따봉업 = [...따봉];
                  따봉업[i] = 따봉업[i] + 1;
                  따봉변경(따봉업);
                }}
              >👍</span> {따봉[i]}
              </h4>
              <p>{날짜[i]} 발행</p>
              <button onClick={ () => {
                const copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      {/* input의 종류 */}
      {/* <input type="checkbox"/>
      <input type="range"/>
      <input type="select"/>
      <input type="textarea"/> */}


      {/* <input onChange={(e)=> {
        입력값변경(e.target.value);
        console.log(입력값);
      }} /> */}

      {/* <button onClick={()=> {setTitle(0)}}>글제목0</button>
      <button onClick={()=> {setTitle(1)}}>글제목1</button>
      <button onClick={()=> {setTitle(2)}}>글제목2</button> */}

      <input onChange={(e) => {
        입력값변경(e.target.value);
      }}
      />
      <button onClick= {() => {
        if(입력값)
        { const copy = [...글제목];
          copy.push(입력값);
          글제목변경(copy);

          const today = new Date();
          const dateFormat1 = today.getFullYear() +
          '년 ' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
          '월 ' + ( (today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()) ) + '일';
          const copy2 = [...날짜];
          copy2.push(dateFormat1);
          날짜변경(copy2);

          const copy3 = [...따봉];
          copy3.push(0);
          따봉변경(copy3);
        } else {
          return;
        }
      }}>글발행</button>

      {
        modal === true ? <Modal title={title} 글제목변경={글제목변경} 글제목={글제목} /> : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <>
      <div className='modal'>
        <h4>{ props.글제목[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={() => {
          const copy = [...props.글제목];
          copy[0] = '여자코트 추천';
          props.글제목변경(copy);
        }}>글수정</button>
      </div>
    </>
  )
}

export default App;