import { useState, useEffect } from "react";
import "./App.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import data from "./data.js";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";
import Cart from "./routes/Cart.js";

function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">연습용 사이트</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              CART
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return (
                      <Card
                        shoes={shoes[i]}
                        i={i + 1}
                        navigate={navigate}
                      ></Card>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((결과) => {
                      let a = [...shoes];
                      a = [...a, ...결과.data];
                      setShoes(a);
                    });
                }}
              >
                더보기
              </button>
            </div>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>없는페이지임</div>} />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<p>첫 주문지 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일 기념 쿠폰 받기</p>} />
        </Route>
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.navigate("/detail/" + props.shoes.id);
        }}
      />
      <h4
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.navigate("/detail/" + props.shoes.id);
        }}
      >
        {props.shoes.title}
      </h4>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.navigate("/detail/" + props.shoes.id);
        }}
      >
        {props.shoes.price}
      </p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
