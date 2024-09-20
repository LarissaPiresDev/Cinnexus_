const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastro() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let cpf = document.getElementById('cpf').value;
    let birthday = document.getElementById('birthday').value;
    let password = document.getElementById('password').value;
    let terms = document.getElementById('terms').checked;

    // Verificar se os campos obrigatórios estão preenchidos
    if (!name || !email || !cpf || !birthday || !password || !terms) {
        alert("Todos os campos são obrigatórios e o termo de uso deve ser aceito.");
        return;
    }

    let submitButton = document.getElementById('Submit'); // Substitua pelo ID correto
    submitButton.disabled = true;

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id":1,
                "cpf": cpf,
                "terms": terms,
                "password": password,
                "birthday": birthday
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        
        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);
            alert("Olá " + name + "! Seu cadastro foi efetuado com sucesso!");
            window.location.href = '/view/login.html';
        } else {
            let respostaErro = await api.json();
            console.log(respostaErro);

            // Tratar erro específico de CPF ou outros erros
            if (respostaErro.data && respostaErro.data.errors) {
                const errors = respostaErro.data.errors;
                if (errors.email) {
                    alert("Erro no email: " + errors.email[0]);
                } else if (errors.cpf) {
                    alert("Erro no CPF: " + errors.cpf[0]);
                } else {
                    alert("Erro ao realizar o cadastro. Verifique os dados e tente novamente.");
                }
            } else {
                alert("Erro desconhecido ao realizar o cadastro.");
            }
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Falha ao se conectar à API. Tente novamente mais tarde.");
    } finally {
        // Habilitar o botão novamente
        submitButton.disabled = false;
    }
}

/*quem contrói a api decide
get->busca
post->requisição
put->atualizaçõa
delete->remover
*/