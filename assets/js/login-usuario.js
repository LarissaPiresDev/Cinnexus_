let url='https://go-wash-api.onrender.com/api/login'

async function login(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let terms = document.getElementById('terms').checked;
    
    if (!email || !password || !terms) {
        alert(' Por favor, preencha todos os campos para efetuar o cadastro')
        return;
    }

    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
            "email":email,
            "user_type_id":1,
            "terms":terms,
            "password": password,

            }
        ),
        headers:{
            'Content-Type':'application/json'
        }
    })
  
    if(api.ok){
        let resposta = await api.json();
        window.location.href="/view/home.html"
        return
    }

    let respostaErro = await api.json();
        alert("Opps!!!! Algo deu errado, tente novamente")
}


