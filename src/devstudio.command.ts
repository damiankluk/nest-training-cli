import {Command, CommandRunner, Option} from "nest-commander";
import * as fs from 'fs';

@Command({
    name: 'devstudio',
    options: { isDefault: true }
})
export class TaskRunner extends CommandRunner {
    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        if (options.version){
            return console.log(`1.0.0v`)
        }
        if (options.help){
            return console.log(`Usage: devstudio [options]
Options:
  -h, --help                 Show help information
  -v, --version              Show the application version
  --show=<filename>          Display the content of the specified file. If the file size exceeds 10KB, an error message will be displayed instead of the file content.

Examples:
  devstudio --help           Display this help message
  devstudio --version        Display the application version
  devstudio --show=my_file.txt Display the content of 'my_file.txt' or an error message if the file size exceeds 10KB
`)
        }

        if (options.show){
            return this.showFile(options.show);
        }
    }
    @Option({
        flags: '-v, --version',
        description: 'Show version',
    })
    parseVersion(val: string) {
        return val;
    }

    @Option({
        flags: '-h, --help',
        description: 'Show help',
    })
    parseHelp(val: string) {
        return val;
    }

    @Option({
        flags: '--show [filename]',
        description: 'Show file content',
    })
    parseShow(val: string) {
        return val;
    }

    showFile(filename: string) {
        const stats = fs.statSync(filename);
        const fileSizeInBytes = stats.size;
        const fileSizeInKilobytes = fileSizeInBytes / 1024;
        if (fileSizeInKilobytes > 10) {
            console.log(`Error: File size exceeds 10KB. Actual file size is ${fileSizeInKilobytes.toFixed(2)}KB`);
        } else {
            const data = fs.readFileSync(filename, 'utf8');
            console.log(data);
        }
    }
}