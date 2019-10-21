import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  // a tarefa que vai ser executad
  async handle({ data }) {
    const { appointment } = data;
    console.log('A fila executou');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}> `,
      subject: 'Agendamento cancelado',
      // text: 'Você tem um novo cancelamento',
      template: 'cancellation',
      content: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        data: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt
          }
        )
      }
    });
  }
}
export default new CancellationMail();
