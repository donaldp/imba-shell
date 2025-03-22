import { transpile } from 'typescript'
import Compiler from './Compiler'

export default class TypeScriptCompiler < Compiler

	def get
		transpile(self.code.trim!, {
			module: 'CommonJS',
			target: 'ESNext',
			moduleResolution: 'node',
			esModuleInterop: true,
		})
