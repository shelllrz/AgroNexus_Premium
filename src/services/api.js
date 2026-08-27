// Simula uma requisição de API sem depender de um servidor externo.
export function simularEnvio(dados) {
  return Promise.resolve({ sucesso: true, dados });
}
