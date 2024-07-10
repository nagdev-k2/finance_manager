interface NewTransactionType {
  transaction: any;
  types: any;
  categories: any;
  handleAddTransaction: Function;
  handleTransactionChange: Function;
}

const NewTransaction = (props: NewTransactionType) => {
  const { transaction, types, categories, handleAddTransaction, handleTransactionChange } = props;
  return (
    <div className='mb-10 border-b-2 border-grey-100 pb-4'>
      <div className='text-lg font-bold pb-2'>Add New Transaction</div>
      <div className='flex items-end'>
        <div className='mr-5'>
          <label>Type: </label>
          <select value={transaction.type} id="type" className='border-2 rounded-xl p-2 w-full' name="type" onChange={handleTransactionChange}>
            {types.map((type: any) => <option key={type.id} value={type.id}> {type.name} </option>)}
          </select>
        </div>
        <div className='mr-5'>
          <label>Categories: </label>
          <select value={transaction.category} id="category" className='border-2 rounded-xl p-2 w-full' name="category" onChange={handleTransactionChange}>
            {categories.map((category: any) => <option key={category.id} value={category.id}> {category.name} </option>)}
          </select>
        </div>
        <div className='mr-5'>
          <label>Date: </label>
          <input id="date" type='date' className='border-2 rounded-xl p-2 w-full' name="date" value={transaction.date} onChange={handleTransactionChange} />
        </div>
        <div className='mr-5'>
          <label>Source: </label>
          <input type='text' className='border-2 rounded-xl p-2 w-full' name="source" value={transaction.source} onChange={handleTransactionChange} />
        </div>
        <div className='mr-5'>
          <label>Value: </label>
          <input type='number' className='border-2 rounded-xl p-2 w-full' name="value" value={transaction.value} onChange={handleTransactionChange} />
        </div>
        <div className='mr-5'>
          <label>Comments: </label>
          <input type='text' className='border-2 rounded-xl p-2 w-full' name="comments" value={transaction.comments} onChange={handleTransactionChange} />
        </div>
        <button className='bg-black text-white rounded-xl w-[100px] h-[50px]' type="submit" onClick={handleAddTransaction}> {transaction.id ? "Update" :"+ Add"} </button>
      </div>
    </div>
  )
}

export default NewTransaction;