import { useEffect, useState } from 'react';
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../styles/theme';

/**
 * Modal para adicionar ou editar produtos
 */
const AddProductModal = ({ visible, onClose, onSave, editingProduct }) => {
	const [nomeProduto, setNomeProduto] = useState('');
	const [quantidade, setQuantidade] = useState('');
	const [precoUnitario, setPrecoUnitario] = useState('');
	const [errors, setErrors] = useState({});

	// Preenche os campos se estiver editando
	useEffect(() => {
		if (editingProduct) {
			setNomeProduto(editingProduct.nomeProduto || '');
			setQuantidade(editingProduct.quantidade?.toString() || '');
			setPrecoUnitario(editingProduct.precoUnitario?.toString() || '');
		} else {
			resetForm();
		}
	}, [editingProduct, visible]);

	const resetForm = () => {
		setNomeProduto('');
		setQuantidade('');
		setPrecoUnitario('');
		setErrors({});
	};

	const validate = () => {
		const newErrors = {};

		if (!nomeProduto.trim()) {
			newErrors.nomeProduto = 'Nome do produto é obrigatório';
		}

		const qtd = parseFloat(quantidade);
		if (!quantidade || isNaN(qtd) || qtd <= 0) {
			newErrors.quantidade = 'Quantidade deve ser maior que 0';
		}

		const preco = parseFloat(precoUnitario);
		if (!precoUnitario || isNaN(preco) || preco <= 0) {
			newErrors.precoUnitario = 'Preço deve ser maior que 0';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = () => {
		if (!validate()) return;

		const product = {
			nomeProduto: nomeProduto.trim(),
			quantidade: parseFloat(quantidade),
			precoUnitario: parseFloat(precoUnitario)
		};

		onSave(product);
		resetForm();
		onClose();
	};

	const handleCancel = () => {
		resetForm();
		onClose();
	};

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={handleCancel}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.overlay}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>
						{editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
					</Text>

					{/* Nome do Produto */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Nome do Produto *</Text>
						<TextInput
							style={[styles.input, errors.nomeProduto && styles.inputError]}
							value={nomeProduto}
							onChangeText={setNomeProduto}
							placeholder="Ex: Arroz"
							placeholderTextColor={theme.colors.textSecondary}
						/>
						{errors.nomeProduto && (
							<Text style={styles.errorText}>{errors.nomeProduto}</Text>
						)}
					</View>

					{/* Quantidade */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Quantidade *</Text>
						<TextInput
							style={[styles.input, errors.quantidade && styles.inputError]}
							value={quantidade}
							onChangeText={setQuantidade}
							placeholder="Ex: 2"
							keyboardType="numeric"
							placeholderTextColor={theme.colors.textSecondary}
						/>
						{errors.quantidade && (
							<Text style={styles.errorText}>{errors.quantidade}</Text>
						)}
					</View>

					{/* Preço Unitário */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Preço Unitário (R$) *</Text>
						<TextInput
							style={[styles.input, errors.precoUnitario && styles.inputError]}
							value={precoUnitario}
							onChangeText={setPrecoUnitario}
							placeholder="Ex: 5.50"
							keyboardType="decimal-pad"
							placeholderTextColor={theme.colors.textSecondary}
						/>
						{errors.precoUnitario && (
							<Text style={styles.errorText}>{errors.precoUnitario}</Text>
						)}
					</View>

					{/* Botões */}
					<View style={styles.buttonContainer}>
						<Button
							mode="outlined"
							onPress={handleCancel}
							style={styles.button}
							textColor={theme.colors.textSecondary}
						>
							Cancelar
						</Button>
						<Button
							mode="contained"
							onPress={handleSave}
							style={styles.button}
							buttonColor={theme.colors.primary}
						>
							{editingProduct ? 'Salvar' : 'Adicionar'}
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContainer: {
		backgroundColor: theme.colors.surface,
		borderRadius: 12,
		padding: theme.spacing.lg,
		width: '90%',
		maxWidth: 400
	},
	title: {
		fontSize: theme.fontSize.xxlarge,
		fontWeight: 'bold',
		color: theme.colors.primary,
		marginBottom: theme.spacing.lg,
		textAlign: 'center'
	},
	inputContainer: {
		marginBottom: theme.spacing.md
	},
	label: {
		fontSize: theme.fontSize.medium,
		fontWeight: '600',
		color: theme.colors.text,
		marginBottom: theme.spacing.xs
	},
	input: {
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderRadius: 8,
		padding: theme.spacing.md,
		fontSize: theme.fontSize.medium,
		backgroundColor: theme.colors.surface
	},
	inputError: {
		borderColor: theme.colors.error
	},
	errorText: {
		color: theme.colors.error,
		fontSize: theme.fontSize.small,
		marginTop: theme.spacing.xs
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing.lg,
		gap: theme.spacing.md
	},
	button: {
		flex: 1
	}
});

export default AddProductModal;
