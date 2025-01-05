// export const execute_command = async (command: string): Promise<string> => {
//   const result = await new Promise<string>((resolve, reject) => {
//     window.postMessage({
//       command: 'execute_command',
//       tool_code: `<execute_command>
//         <command>${command}</command>
//         <requires_approval>false</requires_approval>
//       </execute_command>`,
//     }, '*');

//     window.addEventListener('message', (event) => {
//       if (event.data && event.data.type === 'tool_result' && event.data.tool_code === `<execute_command>
//         <command>${command}</command>
//         <requires_approval>false</requires_approval>
//       </execute_command>`) {
//         if (event.data.error) {
//           reject(new Error(event.data.error));
//         } else {
//           resolve(event.data.result);
//         }
//       }
//     }, { once: true });
//   });
//   return result;
// };
