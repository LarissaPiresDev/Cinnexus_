let url='https://go-wash-api.onrender.com/api/user'

async function cadastro(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let password = document.getElementById('password').value;
    let terms = document.getElementById('terms').checked;
    let ano = birthday.split('-')[0];
    let idade = 2024 - ano
    
    if (!name || !email || !cpf_cnpj || !birthday || !password || !terms) {
        alert(' Por favor, preencha todos os campos para efetuar o cadastro')
        return;

    } else if (cpf_cnpj.length !== 11) {
        alert('Erro, Por favor digite um cpf válido')
        return;
        
    }else if (!email.includes('@') || !email.includes('.com')){
        alert('Email não foi digitado corretamente')
        return;

    } else if (password.length < 8 ) {
        alert('Digite uma senha válida, 8 ou mais caracteres')
        return;

    }  else if(idade < 18 || idade > 110) {
        alert('Idade Inválida')
        return;
    }

    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
            "name":name,
            "email":email,
            "user_type_id":1,
            "cpf_cnpj":cpf_cnpj,
            "terms":terms,
            "password": password,
            "birthday":birthday

            }
        ),
        headers:{
            'Content-Type':'application/json'
        }
    })
  
    if(api.ok){
        let resposta = await api.json();
        alert(" Olá " + name + "! Seu cadastro foi efetuado com Sucesso!!!! Retornando à página principal")
        window.location.href="/view/home.html"
        return
    }

    let respostaErro = await api.json();
        alert("Opps!!!! Algo deu errado, tente novamente")
}


