// Id curto e único o bastante para dados locais (usuários do mock, obras).
// O Hermes não tem crypto.randomUUID, por isso a combinação data + aleatório.
export function createId(prefix = ''): string {
    const time = Date.now().toString(36);
    const random = Math.random().toString(36).slice(2, 10);

    return `${prefix}${time}${random}`;
}
