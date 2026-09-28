export function formatDate(iso: string): string {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
    const date = new Date(iso);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `${formatDate(iso)} às ${time}`;
}

export function formatCoordinates(latitude: number, longitude: number): string {
    return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

type GeocodedAddress = {
    street?: string | null;
    streetNumber?: string | null;
    name?: string | null;
    district?: string | null;
    subregion?: string | null;
    city?: string | null;
    region?: string | null;
};

// "Rua Gonçalo Afonso, 12 · Vila Madalena, São Paulo"
export function formatAddress(address?: GeocodedAddress | null): string | null {
    if (!address) {
        return null;
    }

    const street = address.street
        ? [address.street, address.streetNumber].filter(Boolean).join(', ')
        : address.name;
    const area = [address.district, address.city ?? address.subregion].filter(Boolean).join(', ');
    const text = [street, area].filter(Boolean).join(' · ');

    return text || null;
}
