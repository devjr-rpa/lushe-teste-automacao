document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("leadForm");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", async function(event) {
        // Impede que a página recarregue ao clicar no botão
        event.preventDefault();

        // 1. Captura os dados que o usuário digitou
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;

        // 2. Prevenção de Duplo Clique (Resiliência)
        // Desabilita o botão e muda o texto visualmente
        submitBtn.disabled = true;
        submitBtn.innerText = "Processando sua vaga...";

        // 3. Monta o Payload em formato JSON
        const payload = {
            nome: nome,
            email: email,
            telefone: telefone,
            data_cadastro: new Date().toISOString()
        };

        // Substitua esta URL pelo link de produção (Production URL) do seu Webhook no n8n
        const WEBHOOK_N8N_URL = "https://beth-superrenal-unmasculinely.ngrok-free.dev/webhook-test/913039c5-123b-4c2d-a7d8-78a4b7d22e6e"; 

        try {
            // 4. Dispara o POST para a sua automação (n8n)
            const response = await fetch(WEBHOOK_N8N_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            // 5. Valida se o n8n recebeu com sucesso (Status 200)
            if (response.ok) {
                // Redireciona o usuário para a página de obrigado
                window.location.href = "obrigado.html";
            } else {
                throw new Error("Erro na comunicação com o servidor.");
            }

        } catch (error) {
            // Tratamento de Erro: Se a API falhar ou o n8n estiver fora do ar
            console.error("Erro no envio:", error);
            alert("Ocorreu um erro ao processar sua vaga. Por favor, tente novamente em alguns instantes.");
            
            // Destrava o botão para o usuário tentar de novo
            submitBtn.disabled = false;
            submitBtn.innerText = "Quero Participar da Live";
        }
    });
});
