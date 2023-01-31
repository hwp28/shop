import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { addItem } from "../store";
import { useDispatch, useSelector } from "react-redux";

function Detail(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  let [탭, 탭변경] = useState(0);
  let [saleOpen, setSaleopen] = useState(true);
  let { id } = useParams();
  let 찾은상품 = props.shoes.find((x) => {
    return x.id == id;
  });
  let dispatch = useDispatch();
  const checkCart = state.cart.findIndex((e)=>e.id === 찾은상품.id);
  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])
       

  useEffect(() => {
    setTimeout(() => {
      setSaleopen(false);
    }, 3000);
  }, []);

  return (
    <div className="container">
      {saleOpen == true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (찾은상품.id + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              {
                if(checkCart>-1){
                  if(window.confirm("이미 장바구니에 있는 상품입니다. 장바구니로 이동하시겠습니까?")){
                    navigate("/cart");
                  }
                } else{
                dispatch(
                  addItem({
                    id: 찾은상품.id,
                    name: 찾은상품.title,
                    count: 1,
                  })
                );
                if(window.confirm("상품을 담았습니다. 장바구니로 이동하시겠습니까?")){
                  navigate("/cart");
                }
                }
              }
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 300);
    return () => {
      setFade("");
    };
  }, [탭]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
