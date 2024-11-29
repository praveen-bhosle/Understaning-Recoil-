import React from 'react' 
import { RecoilRoot , useRecoilValue , useRecoilState , atom , selector, useSetRecoilState  } from 'recoil'
import { useState , useEffect } from 'react'

const todoListState  = atom({ 
    key:'todoListState' , 
    default: []
})   
 
const Todo = () => {  
    
   const [ filter , editFilter ] = useState('All') ;  

  return ( 
    <RecoilRoot>   
    <TodoFilter  editFilter  = { editFilter }  />    
    
    <TodoItemCreator  /> 
    <TodoList filter = { filter }/>        
    </RecoilRoot>
  ) 
}     


  
const  TodoList = ( {filter }) => {  

const todoList = useRecoilValue(todoListState) ;  

const [filteredList ,  updateFilteredList ] = useState(todoList) ; 

useEffect (   () => {    
let newList = [ ]  
if(filter === 'Completed')   {     

     newList = filteredList.filter( todoItem => todoItem.isComplete === true  )  ;   
    
    
    updateFilteredList(newList) ;    
}   

else if ( filter === 'Not Completed') {    
    newList = filteredList.filter( todoItem => todoItem.isComplete === false   )  ;  
 updateFilteredList(newList) ; 
} 
}  , [ todoList ,  filter ] )       


if(todoList.length  === 0 )  { 
    return <div> No todos  to display </div> }  
 

   return ( <> 
    {   
        filteredList.map( todoItem => <TodoItem key={todoItem.id } item ={ todoItem } />  )  
    } 
   </> )   
} 
    


  

const TodoItem = ( {item}  ) => {  

    const  [todoList , setTodoList ] = useRecoilState(todoListState ) 

    const index = todoList.findIndex( ( listItem) => listItem === item  ) ;  

    const editItemText = ( {target: { value } }) => 
    {  
        const newList = replaceItemAtIndex(  todoList , index  ,  { 
            ...item ,  text: value , 
        } ) ; 
          
        setTodoList(newList) ; 
    } 
     

    const ToggleCompletion = () => { 
        const newList = replaceItemAtIndex( todoList , index  ,  { 
            ...item  ,  isComplete : !item.isComplete 
        }) 
        
        setTodoList(newList) ; 
    }    
 
    const deleteItem = () => { 
        const newList =   todoList.filter( todoItem => todoItem !== todoList[index]  )
        setTodoList(newList) ;  
    } 
    
    return ( 
        <div>  
            <input type="text"  value={item.text} onChange={editItemText} /> 
            <input type="checkbox" checked={item.isComplete} onChange={ToggleCompletion} /> 
            <button onClick= {deleteItem}> X </button> 
        </div> 
    )
} 

let id = 0 ;          
const getId = ( ) => { 
 return id++ ; 
}         

function replaceItemAtIndex(arr, index, newValue ) { 
    return [...arr.slice( 0,index) ,  newValue ,  ...arr.slice(index+1) ] ; 
}  

function  removeItemAtIndex(arr,index ) { 
    return [...arr.slice(0,index ) , arr.slice(index+1) ]  ;  
}

const TodoItemCreator = ( ) =>   {  

    const [inputValue ,  setInputValue ] = useState('') ; 
    
    const setTodoList = useSetRecoilState( todoListState ) ;    


     
    const addItem = () => { 
        setTodoList( (oldTodoList) => [
            ...oldTodoList , 
            { id: getId() , 
                text:inputValue  ,  
                isComplete: false 
               }  
        ]); 
        setInputValue('') ; 
    } ; 

    const onChange = (  
        { target: {value }  } )  => { 
             setInputValue(value) ;  }  

  
    return(  
        <div>  
            <input type='text' value={inputValue}  onChange={onChange} /> 
            <button onClick={addItem}> Add </button> 
        </div>    
    )  
}    


const TodoFilter =  (  { editFilter} ) => {     
    function handleSubmit(e) {   
        e.preventDefault() ; 
        const selectedOption = e.target.elements['option'].value ;   
        editFilter(selectedOption) ; 
                
    }  

 return(  
   <form   onSubmit= { handleSubmit  }  >    
   <label> 
   <input type="radio"  name="option" value ="All"   />   
   All   
   </label>   
   <label> 
    <input type="radio" name="option" value="Completed"  />  
    Completed 
    </label>  
    <label> 
    <input type="radio" name="option" value="Not Completed" /> 
    Not Completed 
    </label>   
    <button  type="submit" > Submit </button> 
    </form>  
 ) 
}    


export default Todo  