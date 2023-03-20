'use client';

import styles from './page.module.css'

export default function Home() {
    async function runPayment(event) {
        const paymentMethods = [
            {
                supportedMethods: 'https://google.com/pay',
                data: {
                    environment: 'TEST',
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [{
                        type: 'CARD',
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
                        }
                    }]
                }
            },
            {
                supportedMethods: 'https://apple.com/apple-pay'
            },
            {
                supportedMethods: 'https://samsung.com/pay'
            },
        ];

        const paymentDetails = {
            total: {
                label: 'Total',
                amount: { currency: 'BRL', value: '100.00' }
            },
            displayItems: [
                { label: 'Item A', amount: { currency: 'BRL', value: '50.00' } },
                { label: 'Item B', amount: { currency: 'BRL', value: '20.00' } },
                { label: 'Item C', amount: { currency: 'BRL', value: '30.00' } }
            ]
        }

        const options = {
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
            requestShipping: false
        };

        try {
            const paymentRequest = new PaymentRequest(paymentMethods, paymentDetails, options);
            const paymentResponse = await paymentRequest.show();
            await paymentResponse.complete('success');
            console.log('Pagamento realizado com sucesso!');
        } catch (error) {
            console.error('Ocorreu um erro durante o pagamento:', error);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <button onClick={runPayment}>Teste</button>
            </div>
        </main>
    )
}
