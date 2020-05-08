
console.log("Working");

function fetchRecipe(recipe_name){
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`;
    let settings = {
        method : 'GET'
    }
    let main = document.querySelector('.js-search-results');
    fetch(url, settings)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJSON => {
            console.log(responseJSON);
            main.innerHTML = "";
            if (responseJSON.meals == null){
                main.innerHTML = "Meal not found";
            }
            else{
                for(let i=0; i < responseJSON.meals.length; i++){
                    main.innerHTML += 
                    `
                    <div>${responseJSON.meals[i].strMeal}</div>
                    <div>${responseJSON.meals[i].strArea}</div>
                    <div>${responseJSON.meals[i].strInstructions}</div>
                    <div><img src="${responseJSON.meals[i].strMealThumb}" alt="${responseJSON.meals[i].strMeal}"></div>
                    `
                }
            }
        })
        .catch( err =>{
            main.innerHTML = "Meal not found";
            console.log(err.statusText);
        });
}


function watchForm(){
    let recipe_form = document.querySelector('.js-search-form');

    recipe_form.addEventListener( 'submit' , event =>{
        console.log("Clicked");
        event.preventDefault();
        let recipe_name = document.querySelector('.js-query').value;
        console.log(recipe_name); 
        fetchRecipe(recipe_name);
    });
}

function init(){
    watchForm();
}

init();
