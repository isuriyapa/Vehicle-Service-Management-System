import { useStocksContext } from '../hooks/useStocksContext';

const StockDetails = ({ stock }) => {
  const { dispatch } = useStocksContext();

  const handleDelete = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/stock/' + stock._id,
      {
        method: 'DELETE',
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_STOCK', payload: json });
    }
  };
  const handleUpdate = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + '/api/stock/' + stock._id,
      {
        method: 'UPDATE',
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_STOCK', payload: json });
    }
  };

  return (
    <div className='stock-details'>
      <h4>{stock.name}</h4>
      <p>
        <strong>name: </strong>
        {stock.name}
      </p>
      <p>
        <strong>type: </strong>
        {stock.type}
      </p>
      <p>
        <strong>quantity: </strong>
        {stock.quantity}
      </p>
      <p>
        <strong>buying: </strong>
        {stock.buying}
      </p>
      <p>
        <strong>selling: </strong>
        {stock.selling}
      </p>
      <p>
        <strong>supplierName: </strong>
        {stock.supplierName}
      </p>
      <p>{stock.createdAt}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default StockDetails;
