import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Card, Checkbox, IconButton } from 'react-native-paper';
import { theme } from '../styles/theme';

/**
 * Componente que representa um item de produto na lista
 */
const ProductItem = ({ product, onEdit, onDelete, onTogglePurchased }) => {
	const total = product.quantidade * product.precoUnitario;
	const isPurchased = product.comprado || false;

	return (
		<Card
			style={[
				styles.card,
				isPurchased && styles.cardPurchased
			]}
		>
			<Card.Content>
				<View style={styles.container}>
					{/* Checkbox para marcar como comprado */}
					<Checkbox
						status={isPurchased ? 'checked' : 'unchecked'}
						onPress={() => onTogglePurchased(product.id, !isPurchased)}
						color={theme.colors.success}
					/>

					{/* Informações do produto */}
					<View style={styles.info}>
						<Text
							style={[
								styles.productName,
								isPurchased && styles.textPurchased
							]}
						>
							{product.nomeProduto}
						</Text>

						<View style={styles.details}>
							<Text
								style={[
									styles.detailText,
									isPurchased && styles.textPurchased
								]}
							>
								Qtd: {product.quantidade}
							</Text>
							<Text
								style={[
									styles.detailText,
									isPurchased && styles.textPurchased
								]}
							>
								•
							</Text>
							<Text
								style={[
									styles.detailText,
									isPurchased && styles.textPurchased
								]}
							>
								Unit: R$ {product.precoUnitario.toFixed(2)}
							</Text>
						</View>
					</View>

					{/* Total do produto */}
					<View style={styles.totalContainer}>
						<Text
							style={[
								styles.totalLabel,
								isPurchased && styles.textPurchased
							]}
						>
							Total
						</Text>
						<Text
							style={[
								styles.totalValue,
								isPurchased && styles.textPurchased
							]}
						>
							R$ {total.toFixed(2)}
						</Text>
					</View>

					{/* Botões de ação */}
					<View style={styles.actions}>
						<IconButton
							icon="pencil"
							size={20}
							iconColor={theme.colors.primary}
							onPress={() => onEdit(product)}
						/>
						<IconButton
							icon="delete"
							size={20}
							iconColor={theme.colors.error}
							onPress={() => onDelete(product.id)}
						/>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginHorizontal: theme.spacing.md,
		marginVertical: theme.spacing.sm,
		elevation: 2,
		backgroundColor: theme.colors.surface
	},
	cardPurchased: {
		backgroundColor: '#F0F0F0',
		opacity: 0.8
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	info: {
		flex: 1,
		marginLeft: theme.spacing.sm
	},
	productName: {
		fontSize: theme.fontSize.large,
		fontWeight: '600',
		color: theme.colors.text,
		marginBottom: theme.spacing.xs
	},
	details: {
		flexDirection: 'row',
		gap: theme.spacing.xs
	},
	detailText: {
		fontSize: theme.fontSize.small,
		color: theme.colors.textSecondary
	},
	textPurchased: {
		textDecorationLine: 'line-through',
		color: theme.colors.purchased
	},
	totalContainer: {
		alignItems: 'flex-end',
		marginRight: theme.spacing.sm
	},
	totalLabel: {
		fontSize: theme.fontSize.small,
		color: theme.colors.textSecondary
	},
	totalValue: {
		fontSize: theme.fontSize.large,
		fontWeight: 'bold',
		color: theme.colors.primary
	},
	actions: {
		flexDirection: 'row'
	}
});

export default ProductItem;
