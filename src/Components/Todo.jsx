import React from 'react' 
import { RecoilRoot , useRecoilValue , useRecoilState , atom , selector, useSetRecoilState  } from 'recoil'
import { useState , useEffect } from 'react' 
import '../App.css'   

const todoListState  = atom({ 
    key:'todoListState' , 
    default: []
})    


const todoListFilterState = atom( { 
     key: 'TodoListFilter' , 
      default : 'Show All'
     }) 

const filteredTodoListState = selector( {  
    key:'FilteredTodoList' , 
    get: ({get}) => { 
        const filter = get(todoListFilterState) ; 
        const todoList = get(todoListState) ;   

        let filteredList = []

        if(filter === 'Completed') {  
         filteredList = todoList.filter( element => element.isComplete === true  )  }   
        else if (filter === 'Not Completed') { 
         filteredList = todoList.filter(element => element.isComplete === false)
         }  
        else { 
            filteredList = todoList 
        } 
        return  filteredList  ; 
    } 
})  

const TodoListStats_  = selector( { 
    key:'todoliststats' , 
    get: ({get } ) => { 
        const todoList = get(todoListState) ; 
        const total = todoList.length  ; 

     let completed = 0 ; 
    let  uncompleted  = 0 ; 

    for(let i = 0 ; i< todoList.length ; i++ ) { 
        if(todoList[i].isComplete === true) { 
            completed ++ ; 
        }  
        else { 
            uncompleted ++ ; 
        } 
    } 
    return ( 
       {  a: total ,  b: completed ,  c: uncompleted  }
    ) 
    }
 })  
  
const Todo = () => {  
  return ( 
    <RecoilRoot>   
    <TodoListFilters   /> 
    <TodoItemCreator  /> 
    <TodoList  /> 
    <TodoListStats />           
    </RecoilRoot> 
  ) 
}     


const  TodoList = ( ) => {  

     const todoList = useRecoilValue(filteredTodoListState) ;  
     return ( <> 
      {   
        todoList.map( todoItem => {   
        return  <TodoItem key={todoItem.id } item ={ todoItem } />   }  )   
      } 
     </>)   
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
    }
    function  removeItemAtIndex(arr,index ) { 
        return [...arr.slice(0,index ) , arr.slice(index+1) ]  ;  
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


    
function TodoListFilters() { 
  
    const  [filter , setFilter ] = useRecoilState(todoListFilterState) ; 

    const updateFilter = ({ target : { value } } )  => { 
        setFilter(value ) ; 
    }  

    return( 
        <> 
          Filter : 
          <select value ={filter}  onChange = {updateFilter} > 
           <option value="Show All"> All </option> 
           <option value="Completed"> Completed   </option> 
           <option value="Not Completed"> Uncompleted </option>   
          </select> 
        </>
    ) 
 }     
 
 

  
 

const TodoListStats =  () => { 
      
    const Stats  = useRecoilValue (TodoListStats_) ; 
    
    return ( 
        <div>   
          Total: {Stats.a }  <br/> 
          Completed: {Stats.b}  <br/> 
          Uncompleted: {Stats.c} <br/> 
            </div> 
    )
}
 
export default Todo       

