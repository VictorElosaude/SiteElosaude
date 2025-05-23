// Script para adicionar classe 'scrolled' ao navbar ao rolar a página
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// JAVASCRIPT PARA O DESAPARECIMENTO DO TEXTO DA MISSÃO
document.addEventListener('DOMContentLoaded', function() {
  const missionText = document.getElementById('missionText');
  
  // O fundo começa a transicionar para branco aos 6 segundos (6000ms)
  // A transição do fundo dura 2 segundos (até 8000ms)
  const fadeOutStartTime = 6000; // Milissegundos: quando o fade-out deve começar
  const fadeOutDuration = 2000; // Milissegundos: duração do fade-out do texto

  // Inicia o processo de fade-out após o tempo definido
  setTimeout(() => {
    if (missionText) {
      missionText.classList.add('fade-out'); // Adiciona a classe para disparar a transição CSS
      setTimeout(() => {
        missionText.style.display = 'none'; // Esconde completamente após a transição
      }, fadeOutDuration);
    }
  }, fadeOutStartTime);

  // --- JAVASCRIPT PARA O MODAL DE ATUALIZAÇÃO CADASTRAL (MULTI-ETAPAS E "UMA VEZ") ---
  const updateModalElement = document.getElementById('updateModal');
  const hasSeenUpdateModal = localStorage.getItem('modalAtualizacaoVisto');

  // Referências para as seções do modal
  const formSection = document.getElementById('updateModalFormSection');
  const confirmSection = document.getElementById('updateModalConfirmSection');
  const successSection = document.getElementById('updateModalSuccessSection');

  // Referências para os campos de input
  const inputCpf = document.getElementById('updateCpf');
  const inputDataNascimento = document.getElementById('updateDataNascimento');
  const inputEmail = document.getElementById('updateEmail');
  const inputTelefone = document.getElementById('updateTelefone');

  // Referências para os spans de confirmação
  const confirmCpf = document.getElementById('confirmCpf');
  const confirmDataNascimento = document.getElementById('confirmDataNascimento');
  const confirmEmail = document.getElementById('confirmEmail');
  const confirmTelefone = document.getElementById('confirmTelefone');

  // Referências para os botões
  const nextToConfirmButton = document.getElementById('nextToConfirmButton');
  const confirmUpdateButton = document.getElementById('confirmUpdateButton');
  const backToFormButton = document.getElementById('backToFormButton');
  
  // Instancia o modal do Bootstrap
  const updateModal = new bootstrap.Modal(updateModalElement);

  // Função para resetar o modal para a primeira etapa
  function resetUpdateModal() {
    formSection.style.display = 'block';
    confirmSection.style.display = 'none';
    successSection.style.display = 'none';
    // Limpar campos de input se necessário, ou manter valores
    // inputCpf.value = ''; 
    // ... outros campos
  }

  // Listener para quando o modal for mostrado (para resetar o estado)
  updateModalElement.addEventListener('show.bs.modal', resetUpdateModal);

  // Exibe o modal de atualização cadastral se não foi visto antes
  if (!hasSeenUpdateModal) {
    updateModal.show();
    // Marca no localStorage que o modal foi visto.
    // Fazemos isso AGORA, pois o objetivo é mostrar UMA VEZ.
    // Se o usuário fechar, ele não verá novamente.
    localStorage.setItem('modalAtualizacaoVisto', 'true');
  }

  // Evento para ir para a tela de confirmação
  nextToConfirmButton.addEventListener('click', function() {
    // Pega os valores dos inputs
    const cpfValue = inputCpf.value;
    const dataNascimentoValue = inputDataNascimento.value;
    const emailValue = inputEmail.value;
    const telefoneValue = inputTelefone.value;

    // Preenche os spans na seção de confirmação
    confirmCpf.textContent = cpfValue || 'Não informado'; // Exibe "Não informado" se o campo estiver vazio
    confirmDataNascimento.textContent = dataNascimentoValue || 'Não informado';
    confirmEmail.textContent = emailValue || 'Não informado';
    confirmTelefone.textContent = telefoneValue || 'Não informado';

    // Oculta a seção do formulário e mostra a de confirmação
    formSection.style.display = 'none';
    confirmSection.style.display = 'block';
    successSection.style.display = 'none';
  });

  // Evento para voltar para a tela do formulário
  backToFormButton.addEventListener('click', function() {
    resetUpdateModal();
  });

  // Evento para confirmar a atualização
  confirmUpdateButton.addEventListener('click', function() {
    // Aqui você faria a lógica de envio dos dados para o seu backend
    // Por exemplo:
    const dataToUpdate = {
      cpf: inputCpf.value,
      dataNascimento: inputDataNascimento.value,
      email: inputEmail.value,
      telefone: inputTelefone.value
    };
    console.log('Dados a serem atualizados:', dataToUpdate);

    // Simula um delay para envio de dados
    setTimeout(() => {
      confirmSection.style.display = 'none';
      successSection.style.display = 'block';
      // Não fecha o modal automaticamente aqui, o usuário clica em "Entendi"
      // updateModal.hide(); // Se quiser fechar automaticamente
    }, 500); // Meio segundo de delay para simular envio
  });
});

// Opcional: Para fins de teste, você pode usar este comando no console do navegador para resetar a flag e ver o modal novamente:
// localStorage.removeItem('modalAtualizacaoVisto');