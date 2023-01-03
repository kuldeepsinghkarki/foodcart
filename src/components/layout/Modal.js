import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const portalElement = document.getElementById("overlays");

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const dispatch = useDispatch();
  const closeCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={closeCartHandler} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
