29-11-24 
Concepts:  
Usage of Atoms , selectors.
Synchronous state management using useRecoilState ,  useRecoilValue. 
  
Applications : Simple Todo App with filter options using the above concepts.    



Minor Stuff learned when tried to do things by myself  :   


index = array.findIndex( element => element  === element_to_be_found ) 
gives us the  index of the first  occurence of the element_to_be_found   


HTML  inputs  : 
<input value={}>
The 'value' attribute here is different from the 'value' property which we get from the event.targt.value. The attribute 'value'  is only used to set the default text to  be present in the input. The property 'value'  is gives us the actual value of the input ,  when the input text changes this will also change.It is dynamic.     


useEffect : 
When rendering components with states  , update states while the component renders leads to issues. Thats why we can use useEffect  which will update states only when the whole component is reneders and not before that. We can add relevant stuff in  the dependencies to cause futher re-renders. 
The useState initial value can be set dynamically using if else conditions. 


Accessing what was submitted by the forms : 
onSubmit =  { (e) =>   { 
     e.preventDefault()  ; 
     e.target.elements['xyz'] ; // this goves us access to the radios who have  name='xyz'. 
     then we can use 
     e.target.elements['xyz'].value to get what option was actually selected.  

     e.target.elemensts : Will give us the value of all the input elements of a form.                        
 } }  


  



