import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { messageModal } from '../Redux/Actions';

const App = ({infoModal, textoBotao, onClick, dispatch}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = async () => {
	if( textoBotao === "Aprovar"){
		dispatch(messageModal('Pedido Atualizado com sucesso'))
	}
	  	
	setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
	if(onClick){
		await onClick()
	}
	dispatch(messageModal(''))
  };

  const handleCancel = async () => {
    setIsModalVisible(false);
	if(onClick){
		await onClick()
	}
	dispatch(messageModal(''))
  };

  return (
    <>
      <Button type="primary" onClick={showModal} htmlType="submit">
        {textoBotao}
      </Button>
      <Modal title="Alerta" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{infoModal}</p>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) =>({
	infoModal: state.modal.message
})

export default connect(mapStateToProps)(App);