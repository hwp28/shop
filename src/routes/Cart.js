import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName,increase } from "./../store/userSlice.js";
import {addCount,sbtCount} from "./../store.js"

function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();


  return (
    <div>
        <h6>{state.user.name} {state.user.age}의 장바구니</h6>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>+ -</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button onClick={() => {
                    dispatch(addCount(state.cart[i].id));
                  }}
                >
                +
                </button>
                <button onClick={() => {
                    dispatch(sbtCount(state.cart[i].id));
                  }}
                >
                -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
