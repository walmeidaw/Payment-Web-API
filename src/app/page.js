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
                    merchantInfo: {
                        merchantId: '07821208636059528377',
                        merchantName: 'Karpa Dev'
                    },
                    allowedPaymentMethods: [{
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"]
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                "gateway": "stripe",
                                "stripe:version": "2018-10-31",
                                "stripe:publishableKey": "pk_test_51Mnr62LlyCPn2xwVWdyEqo5tEZLJWIuCADgcynYc0Sldi3zI7pTN62ibKcCYEvuhlEbmqzBWXQAqsABeDBcUc2ji00EQWtVwb9"
                            }
                        }
                    }]
                }
            }
        ];

        const paymentDetails = {
            total: {
                label: 'Total',
                amount: { currency: 'BRL', value: '1.00' }
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
            console.log( 'request', paymentRequest )
            const paymentResponse = await paymentRequest.show();

            console.log( 'response', paymentResponse )

            await paymentResponse.complete('success');
            console.log('Pagamento realizado com sucesso!');
        } catch (error) {
            console.error('Ocorreu um erro durante o pagamento:', error);
        }
    }

    return (
        <main className={styles.main}>
            <div style={{ display: 'flex' }}>
                <button onClick={runPayment} style={{ display: 'flex', border: '0', padding: '1rem' }}>Teste</button>
            </div>
        </main>
    )
}
